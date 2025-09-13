#!/usr/bin/env python3
"""
Example usage scripts for the Network Scanner Tool
Demonstrates various scanning scenarios and use cases
"""

import sys
import os
sys.path.append(os.path.dirname(__file__))

from network_scanner import NetworkScanner

def example_basic_scan():
    """Example: Basic scan of localhost"""
    print("=== Example 1: Basic Localhost Scan ===")
    scanner = NetworkScanner()
    scanner.timeout = 1
    scanner.verbose = True
    
    results = scanner.scan(
        targets=['127.0.0.1'],
        port_range='22,80,443,8080'
    )
    return results

def example_range_scan():
    """Example: Scan a range of IPs for web services"""
    print("\n=== Example 2: Web Service Range Scan ===")
    scanner = NetworkScanner()
    scanner.timeout = 2
    
    # Scan for web services on local network range
    # Note: This will only work if you have permission to scan this range
    results = scanner.scan(
        targets=['127.0.0.1-5'],  # Local range for testing
        port_range='80,443,8080,8443'
    )
    return results

def example_json_output():
    """Example: Export scan results to JSON"""
    print("\n=== Example 3: JSON Output ===")
    scanner = NetworkScanner()
    scanner.timeout = 1
    
    results = scanner.scan(
        targets=['127.0.0.1'],
        port_range='common',
        output_format='json',
        output_file='example_results.json'
    )
    return results

def example_custom_scan():
    """Example: Custom scan configuration"""
    print("\n=== Example 4: Custom Configuration ===")
    scanner = NetworkScanner()
    
    # Custom configuration
    scanner.timeout = 3
    scanner.threads = 25
    scanner.verbose = True
    
    # Add custom port definitions
    scanner.common_ports.update({
        8000: "HTTP-Alt",
        9000: "SonarQube",
        3000: "Node.js",
        5000: "Flask"
    })
    
    results = scanner.scan(
        targets=['127.0.0.1'],
        port_range='8000,9000,3000,5000'
    )
    return results

def demonstration_scan():
    """Run all examples for demonstration"""
    print("Network Scanner Tool - Example Usage")
    print("=" * 50)
    print("DISCLAIMER: These examples scan localhost only.")
    print("Only scan networks you own or have permission to test.")
    print("=" * 50)
    
    try:
        # Run examples
        example_basic_scan()
        example_json_output()
        example_custom_scan()
        
        print("\n=== Examples Complete ===")
        print("Check example_results.json for JSON output example")
        
    except KeyboardInterrupt:
        print("\nExamples interrupted by user")
    except Exception as e:
        print(f"Error running examples: {e}")

if __name__ == "__main__":
    demonstration_scan()