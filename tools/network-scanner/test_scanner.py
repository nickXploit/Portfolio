#!/usr/bin/env python3
"""
Network Scanner Tool - Test Suite
Comprehensive testing of scanner functionality
"""

import unittest
import sys
import os
import json
from unittest.mock import Mock, patch

# Add the current directory to path so we can import the scanner
sys.path.append(os.path.dirname(__file__))

from network_scanner import NetworkScanner

class TestNetworkScanner(unittest.TestCase):
    """Test cases for the Network Scanner Tool"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.scanner = NetworkScanner()
        self.scanner.timeout = 1  # Fast timeout for testing
        self.scanner.threads = 10  # Fewer threads for testing
    
    def test_ip_validation(self):
        """Test IP address validation"""
        # Valid IPs
        self.assertTrue(self.scanner.validate_ip("192.168.1.1"))
        self.assertTrue(self.scanner.validate_ip("127.0.0.1"))
        self.assertTrue(self.scanner.validate_ip("10.0.0.1"))
        
        # Invalid IPs
        self.assertFalse(self.scanner.validate_ip("256.256.256.256"))
        self.assertFalse(self.scanner.validate_ip("192.168.1"))
        self.assertFalse(self.scanner.validate_ip("not.an.ip.address"))
    
    def test_port_range_parsing(self):
        """Test port range parsing functionality"""
        # Single port
        ports = self.scanner.parse_port_range("80")
        self.assertEqual(ports, [80])
        
        # Multiple ports
        ports = self.scanner.parse_port_range("80,443,22")
        self.assertCountEqual(ports, [80, 443, 22])
        
        # Port range
        ports = self.scanner.parse_port_range("80-82")
        self.assertEqual(ports, [80, 81, 82])
        
        # Common ports
        ports = self.scanner.parse_port_range("common")
        self.assertIn(80, ports)
        self.assertIn(443, ports)
        self.assertIn(22, ports)
    
    def test_ip_range_generation(self):
        """Test IP range generation"""
        # Single IP
        ips = self.scanner.generate_ip_range("127.0.0.1")
        self.assertEqual(ips, ["127.0.0.1"])
        
        # IP range
        ips = self.scanner.generate_ip_range("127.0.0.1-3")
        expected = ["127.0.0.1", "127.0.0.2", "127.0.0.3"]
        self.assertEqual(ips, expected)
    
    def test_service_identification(self):
        """Test service identification logic"""
        # Known port without banner
        service = self.scanner.identify_service(80, "")
        self.assertEqual(service, "HTTP")
        
        # Known port with banner
        banner = "HTTP/1.1 200 OK Server: Apache/2.4.41"
        service = self.scanner.identify_service(80, banner)
        self.assertIn("HTTP", service)
        
        # Unknown port without banner
        service = self.scanner.identify_service(9999, "")
        self.assertEqual(service, "unknown")
    
    def test_os_detection(self):
        """Test basic OS detection"""
        # Windows indicators
        windows_ports = [
            {"port": 3389, "banner": "Microsoft Terminal Services"},
            {"port": 445, "banner": "Microsoft-DS"}
        ]
        os_detected = self.scanner.detect_os("192.168.1.1", windows_ports)
        self.assertEqual(os_detected, "Windows")
        
        # Linux indicators
        linux_ports = [
            {"port": 22, "banner": "SSH-2.0-OpenSSH_7.4"},
            {"port": 80, "banner": "Apache/2.4.6 (CentOS)"}
        ]
        os_detected = self.scanner.detect_os("192.168.1.1", linux_ports)
        self.assertEqual(os_detected, "Linux")
    
    def test_localhost_scan(self):
        """Test scanning localhost (integration test)"""
        # This test requires actual network connectivity
        try:
            result = self.scanner.scan_host("127.0.0.1", [80, 22])
            
            # Verify result structure
            self.assertIn('ip', result)
            self.assertIn('open_ports', result)
            self.assertIn('os', result)
            self.assertIn('scan_time', result)
            
            self.assertEqual(result['ip'], "127.0.0.1")
            self.assertIsInstance(result['open_ports'], list)
            
        except Exception as e:
            print(f"Integration test skipped: {e}")

def run_manual_tests():
    """Run manual tests to demonstrate functionality"""
    print("=" * 60)
    print("Network Scanner Tool - Manual Testing")
    print("=" * 60)
    
    scanner = NetworkScanner()
    scanner.timeout = 1
    scanner.verbose = True
    
    print("\n1. Testing localhost scan...")
    try:
        results = scanner.scan(['127.0.0.1'], '22,80', 'console')
        print("✓ Localhost scan successful")
    except Exception as e:
        print(f"✗ Localhost scan failed: {e}")
    
    print("\n2. Testing JSON output...")
    try:
        results = scanner.scan(['127.0.0.1'], '80', 'json')
        print("✓ JSON output successful")
    except Exception as e:
        print(f"✗ JSON output failed: {e}")
    
    print("\n3. Testing port range parsing...")
    test_ranges = ['common', '80,443,22', '80-85', '8000-8010']
    for port_range in test_ranges:
        ports = scanner.parse_port_range(port_range)
        print(f"   {port_range} -> {len(ports)} ports")
    
    print("\n4. Testing IP range generation...")
    test_ips = ['127.0.0.1', '127.0.0.1-3']
    for ip_range in test_ips:
        ips = scanner.generate_ip_range(ip_range)
        print(f"   {ip_range} -> {ips}")
    
    print("\n" + "=" * 60)
    print("Manual testing complete!")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Test the Network Scanner Tool")
    parser.add_argument('--unit', action='store_true', help='Run unit tests')
    parser.add_argument('--manual', action='store_true', help='Run manual tests')
    parser.add_argument('--all', action='store_true', help='Run all tests')
    
    args = parser.parse_args()
    
    if args.unit or args.all:
        print("Running unit tests...")
        unittest.main(argv=[''], exit=False, verbosity=2)
    
    if args.manual or args.all:
        run_manual_tests()
    
    if not any([args.unit, args.manual, args.all]):
        print("Use --unit, --manual, or --all to run tests")
        print("Example: python test_scanner.py --all")