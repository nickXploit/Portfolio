#!/usr/bin/env python3
"""
Network Scanner Tool - Educational Implementation
Author: Portfolio Project
Date: 2024

A simplified network scanning tool similar to Nmap, designed for educational purposes.
This tool demonstrates basic network scanning techniques including:
- TCP connect scanning
- Basic service identification
- Simple OS fingerprinting
- Port range scanning

DISCLAIMER: This tool is for educational purposes only. Use only on networks
you own or have explicit permission to test.
"""

import socket
import threading
import argparse
import json
import time
import sys
import re
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
from colorama import init, Fore, Back, Style

# Initialize colorama for cross-platform colored output
init()

class NetworkScanner:
    """
    A simplified network scanner for educational purposes.
    Implements basic TCP connect scanning and service identification.
    """
    
    def __init__(self):
        self.timeout = 3
        self.threads = 50
        self.verbose = False
        self.results = {}
        self.common_ports = {
            21: "FTP",
            22: "SSH", 
            23: "Telnet",
            25: "SMTP",
            53: "DNS",
            80: "HTTP",
            110: "POP3",
            143: "IMAP",
            443: "HTTPS",
            993: "IMAPS",
            995: "POP3S",
            3389: "RDP",
            5432: "PostgreSQL",
            3306: "MySQL",
            1433: "MSSQL",
            6379: "Redis",
            27017: "MongoDB",
            8080: "HTTP-Proxy",
            8443: "HTTPS-Alt"
        }
        
        # Simple service banners for identification
        self.service_banners = {
            "SSH": ["SSH-", "OpenSSH"],
            "HTTP": ["HTTP/", "Server:", "Apache", "nginx", "IIS"],
            "FTP": ["220", "FTP"],
            "SMTP": ["220", "SMTP", "ESMTP"],
            "POP3": ["+OK", "POP3"],
            "IMAP": ["* OK", "IMAP"]
        }
        
        # Simple OS fingerprinting patterns
        self.os_patterns = {
            "Linux": ["Linux", "Ubuntu", "CentOS", "Debian", "RedHat"],
            "Windows": ["Windows", "Microsoft", "IIS"],
            "Unix": ["Unix", "BSD", "Solaris"],
            "Network Device": ["Cisco", "Juniper", "Router", "Switch"]
        }

    def print_banner(self):
        """Print the tool banner"""
        banner = f"""
{Fore.GREEN}╔══════════════════════════════════════════════════════════════╗
║                    Network Scanner Tool                      ║
║                   Educational Implementation                 ║
║                                                              ║
║  WARNING: Use only on networks you own or have permission   ║
║           to test. This tool is for educational purposes.   ║
╚══════════════════════════════════════════════════════════════╝{Style.RESET_ALL}
        """
        print(banner)

    def validate_ip(self, ip):
        """Validate IP address format"""
        pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
        if re.match(pattern, ip):
            octets = ip.split('.')
            return all(0 <= int(octet) <= 255 for octet in octets)
        return False

    def generate_ip_range(self, ip_range):
        """Generate list of IPs from range notation (e.g., 192.168.1.1-10)"""
        ips = []
        
        if '-' in ip_range:
            # Handle range like 192.168.1.1-10
            base_ip, end_range = ip_range.split('-')
            if self.validate_ip(base_ip):
                base_parts = base_ip.split('.')
                start_host = int(base_parts[3])
                end_host = int(end_range) if end_range.isdigit() else int(end_range.split('.')[-1])
                
                for i in range(start_host, end_host + 1):
                    ip = f"{'.'.join(base_parts[:3])}.{i}"
                    if self.validate_ip(ip):
                        ips.append(ip)
        elif '/' in ip_range:
            # Handle CIDR notation (basic implementation)
            print(f"{Fore.YELLOW}CIDR notation not fully implemented. Use range notation instead.{Style.RESET_ALL}")
            return []
        else:
            # Single IP
            if self.validate_ip(ip_range):
                ips.append(ip_range)
        
        return ips

    def scan_port(self, ip, port):
        """Scan a single port using TCP connect scan"""
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(self.timeout)
            result = sock.connect_ex((ip, port))
            
            if result == 0:
                # Port is open, try to grab banner
                banner = self.grab_banner(sock, ip, port)
                service = self.identify_service(port, banner)
                sock.close()
                return {
                    'port': port,
                    'state': 'open',
                    'service': service,
                    'banner': banner
                }
            else:
                sock.close()
                return {
                    'port': port,
                    'state': 'closed',
                    'service': 'unknown',
                    'banner': ''
                }
        except socket.timeout:
            return {
                'port': port,
                'state': 'filtered',
                'service': 'unknown',
                'banner': ''
            }
        except Exception as e:
            if self.verbose:
                print(f"{Fore.RED}Error scanning {ip}:{port} - {str(e)}{Style.RESET_ALL}")
            return {
                'port': port,
                'state': 'error',
                'service': 'unknown',
                'banner': ''
            }

    def grab_banner(self, sock, ip, port):
        """Attempt to grab service banner"""
        try:
            # Send a simple request for HTTP services
            if port in [80, 8080, 443, 8443]:
                sock.send(b"GET / HTTP/1.0\r\n\r\n")
            
            # Set socket to non-blocking for banner grab
            sock.settimeout(2)
            banner = sock.recv(1024).decode('utf-8', 'ignore').strip()
            return banner[:200]  # Limit banner length
        except:
            return ""

    def identify_service(self, port, banner):
        """Identify service based on port and banner"""
        # First check common ports
        if port in self.common_ports:
            service = self.common_ports[port]
            
            # Enhance with banner analysis
            if banner:
                for service_name, patterns in self.service_banners.items():
                    for pattern in patterns:
                        if pattern.lower() in banner.lower():
                            return f"{service} ({service_name})"
            
            return service
        
        # If not in common ports, try banner analysis
        if banner:
            for service_name, patterns in self.service_banners.items():
                for pattern in patterns:
                    if pattern.lower() in banner.lower():
                        return service_name
        
        return "unknown"

    def detect_os(self, ip, open_ports):
        """Basic OS detection based on open ports and banners"""
        os_hints = []
        
        # Analyze banners for OS clues
        for port_info in open_ports:
            banner = port_info.get('banner', '')
            for os_name, patterns in self.os_patterns.items():
                for pattern in patterns:
                    if pattern.lower() in banner.lower():
                        os_hints.append(os_name)
        
        # Port-based OS detection
        port_numbers = [p['port'] for p in open_ports]
        
        if 3389 in port_numbers:  # RDP
            os_hints.append("Windows")
        if 22 in port_numbers and 80 in port_numbers:  # SSH + HTTP common on Linux
            os_hints.append("Linux")
        if 23 in port_numbers:  # Telnet often on network devices
            os_hints.append("Network Device")
        
        # Return most common OS hint
        if os_hints:
            return max(set(os_hints), key=os_hints.count)
        return "Unknown"

    def scan_host(self, ip, ports):
        """Scan all specified ports on a host"""
        if self.verbose:
            print(f"{Fore.CYAN}Scanning {ip}...{Style.RESET_ALL}")
        
        open_ports = []
        
        with ThreadPoolExecutor(max_workers=self.threads) as executor:
            # Submit all port scan tasks
            future_to_port = {
                executor.submit(self.scan_port, ip, port): port 
                for port in ports
            }
            
            # Collect results
            for future in as_completed(future_to_port):
                result = future.result()
                if result['state'] == 'open':
                    open_ports.append(result)
                    if self.verbose:
                        print(f"{Fore.GREEN}[+] {ip}:{result['port']} OPEN - {result['service']}{Style.RESET_ALL}")
        
        # Detect OS if ports are open
        detected_os = "Unknown"
        if open_ports:
            detected_os = self.detect_os(ip, open_ports)
        
        return {
            'ip': ip,
            'open_ports': open_ports,
            'os': detected_os,
            'scan_time': datetime.now().isoformat()
        }

    def parse_port_range(self, port_range):
        """Parse port range string into list of ports"""
        ports = []
        
        if port_range.lower() == 'common':
            return list(self.common_ports.keys())
        
        try:
            ranges = port_range.split(',')
            for r in ranges:
                if '-' in r:
                    start, end = map(int, r.split('-'))
                    ports.extend(range(start, end + 1))
                else:
                    ports.append(int(r))
        except ValueError:
            print(f"{Fore.RED}Invalid port range: {port_range}{Style.RESET_ALL}")
            return []
        
        return [p for p in ports if 1 <= p <= 65535]

    def display_results(self, results, output_format='console'):
        """Display scan results in specified format"""
        if output_format == 'json':
            print(json.dumps(results, indent=2))
            return
        
        # Console output
        print(f"\n{Fore.YELLOW}{'='*60}")
        print(f"NETWORK SCAN RESULTS")
        print(f"{'='*60}{Style.RESET_ALL}")
        
        for host_result in results:
            ip = host_result['ip']
            open_ports = host_result['open_ports']
            detected_os = host_result['os']
            
            print(f"\n{Fore.CYAN}Host: {ip}{Style.RESET_ALL}")
            print(f"OS Detected: {Fore.MAGENTA}{detected_os}{Style.RESET_ALL}")
            
            if open_ports:
                print(f"Open Ports: {Fore.GREEN}{len(open_ports)} found{Style.RESET_ALL}")
                print("-" * 50)
                for port in open_ports:
                    banner_info = f" - {port['banner'][:50]}..." if port['banner'] else ""
                    print(f"  {Fore.GREEN}{port['port']}/tcp{Style.RESET_ALL} - "
                          f"{Fore.YELLOW}{port['service']}{Style.RESET_ALL}{banner_info}")
            else:
                print(f"{Fore.RED}No open ports found{Style.RESET_ALL}")

    def save_results(self, results, filename):
        """Save results to file"""
        try:
            with open(filename, 'w') as f:
                json.dump(results, f, indent=2)
            print(f"{Fore.GREEN}Results saved to {filename}{Style.RESET_ALL}")
        except Exception as e:
            print(f"{Fore.RED}Error saving results: {str(e)}{Style.RESET_ALL}")

    def scan(self, targets, port_range, output_format='console', output_file=None):
        """Main scanning function"""
        self.print_banner()
        
        # Parse ports
        ports = self.parse_port_range(port_range)
        if not ports:
            print(f"{Fore.RED}No valid ports to scan{Style.RESET_ALL}")
            return
        
        # Generate target IPs
        target_ips = []
        for target in targets:
            target_ips.extend(self.generate_ip_range(target))
        
        if not target_ips:
            print(f"{Fore.RED}No valid targets to scan{Style.RESET_ALL}")
            return
        
        print(f"{Fore.CYAN}Starting scan of {len(target_ips)} hosts on {len(ports)} ports{Style.RESET_ALL}")
        print(f"Timeout: {self.timeout}s | Threads: {self.threads}")
        print(f"Ports: {port_range}")
        print("-" * 60)
        
        # Scan all hosts
        results = []
        start_time = time.time()
        
        for ip in target_ips:
            result = self.scan_host(ip, ports)
            results.append(result)
        
        scan_duration = time.time() - start_time
        
        print(f"\n{Fore.GREEN}Scan completed in {scan_duration:.2f} seconds{Style.RESET_ALL}")
        
        # Display results
        self.display_results(results, output_format)
        
        # Save to file if requested
        if output_file:
            self.save_results(results, output_file)
        
        return results


def main():
    """Main function with command line argument parsing"""
    parser = argparse.ArgumentParser(
        description="Educational Network Scanner Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s -t 192.168.1.1 -p common
  %(prog)s -t 192.168.1.1-10 -p 80,443,22
  %(prog)s -t 10.0.0.1 -p 1-1000 --timeout 5 --threads 100
  %(prog)s -t 192.168.1.100 -p common --output json --save results.json

DISCLAIMER: This tool is for educational purposes only.
Use only on networks you own or have explicit permission to test.
        """
    )
    
    parser.add_argument('-t', '--target', required=True, nargs='+',
                        help='Target IP address or range (e.g., 192.168.1.1 or 192.168.1.1-10)')
    parser.add_argument('-p', '--ports', default='common',
                        help='Port range to scan (e.g., 80,443,22 or 1-1000 or common)')
    parser.add_argument('--timeout', type=int, default=3,
                        help='Connection timeout in seconds (default: 3)')
    parser.add_argument('--threads', type=int, default=50,
                        help='Number of threads to use (default: 50)')
    parser.add_argument('-v', '--verbose', action='store_true',
                        help='Enable verbose output')
    parser.add_argument('--output', choices=['console', 'json'], default='console',
                        help='Output format (default: console)')
    parser.add_argument('--save', type=str,
                        help='Save results to file')
    
    args = parser.parse_args()
    
    # Create scanner instance
    scanner = NetworkScanner()
    scanner.timeout = args.timeout
    scanner.threads = args.threads
    scanner.verbose = args.verbose
    
    try:
        # Start scanning
        scanner.scan(
            targets=args.target,
            port_range=args.ports,
            output_format=args.output,
            output_file=args.save
        )
    except KeyboardInterrupt:
        print(f"\n{Fore.YELLOW}Scan interrupted by user{Style.RESET_ALL}")
    except Exception as e:
        print(f"{Fore.RED}Error: {str(e)}{Style.RESET_ALL}")


if __name__ == "__main__":
    main()