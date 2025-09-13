# Network Scanner Tool - Educational Implementation

A Python-based network scanning tool designed for educational purposes, demonstrating basic network reconnaissance techniques similar to Nmap.

## ⚠️ DISCLAIMER

**This tool is for educational purposes only.** Use only on networks you own or have explicit permission to test. Unauthorized network scanning may be illegal in your jurisdiction and could violate computer crime laws.

## Features

- **TCP Connect Scanning**: Reliable port scanning using full TCP handshake
- **Service Identification**: Basic service detection based on ports and banners
- **OS Fingerprinting**: Simple operating system detection 
- **Multi-threading**: Configurable concurrent scanning for performance
- **Multiple Output Formats**: Console and JSON output options
- **IP Range Support**: Scan single IPs or IP ranges
- **Timeout Management**: Configurable connection timeouts
- **Banner Grabbing**: Capture service banners for identification

## Installation

### Prerequisites

- Python 3.6 or higher
- pip package manager

### Setup

1. Clone or download the network scanner files
2. Navigate to the scanner directory:
   ```bash
   cd tools/network-scanner
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Make the script executable (Unix/Linux/macOS):
   ```bash
   chmod +x network_scanner.py
   ```

## Usage

### Basic Syntax

```bash
python network_scanner.py -t <target> -p <ports> [options]
```

### Examples

#### Scan common ports on a single host
```bash
python network_scanner.py -t 192.168.1.1 -p common
```

#### Scan specific ports on multiple hosts
```bash
python network_scanner.py -t 192.168.1.1-10 -p 80,443,22
```

#### Verbose scan with custom timeout
```bash
python network_scanner.py -t 10.0.0.1 -p 1-1000 --timeout 5 --threads 100 -v
```

#### Export results to JSON
```bash
python network_scanner.py -t 192.168.1.100 -p common --output json --save results.json
```

### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `-t, --target` | Target IP or range (required) | - |
| `-p, --ports` | Ports to scan | common |
| `--timeout` | Connection timeout (seconds) | 3 |
| `--threads` | Number of threads | 50 |
| `-v, --verbose` | Enable verbose output | False |
| `--output` | Output format (console/json) | console |
| `--save` | Save results to file | - |

### Port Specifications

- **Common ports**: Use `common` to scan well-known ports
- **Port ranges**: `1-1000`, `80-443`
- **Specific ports**: `80,443,22,3389`
- **Mixed**: `80,443,8000-8010`

### Target Specifications

- **Single IP**: `192.168.1.1`
- **IP Range**: `192.168.1.1-50`
- **Multiple targets**: `-t 192.168.1.1 10.0.0.1`

## Technical Details

### Scanning Methodology

The tool uses **TCP Connect Scanning**, which:
- Establishes full TCP connections to target ports
- More reliable than other scan types
- Easily detected by intrusion detection systems
- Suitable for educational purposes

### Service Identification

Services are identified through:
1. **Port-based identification**: Common services on standard ports
2. **Banner grabbing**: Analyzing service responses
3. **Pattern matching**: Comparing banners against known signatures

### OS Detection

Basic operating system fingerprinting using:
- Open port combinations
- Service banner analysis
- Protocol response patterns

**Note**: This is a simplified implementation compared to professional tools.

## Educational Content

### How Network Scanning Works

Network scanning is a reconnaissance technique used to:
1. **Discover live hosts** on a network
2. **Identify open ports** on target systems
3. **Determine running services** and their versions
4. **Fingerprint operating systems**

### TCP Connect Scan Process

1. **SYN**: Scanner sends TCP SYN packet to target port
2. **SYN-ACK**: Target responds if port is open
3. **ACK**: Scanner completes handshake
4. **RST**: Scanner closes connection immediately

### Comparison with Professional Tools

| Feature | This Tool | Nmap | Purpose |
|---------|-----------|------|---------|
| Scan Types | TCP Connect | 10+ types | Educational vs Professional |
| OS Detection | Basic patterns | Advanced fingerprinting | Learning vs Accuracy |
| Performance | Moderate | Optimized | Simplicity vs Speed |
| Stealth | None | Multiple techniques | Educational vs Operational |

## Limitations

This educational implementation has several limitations compared to professional tools:

- **Limited scan types**: Only TCP connect scanning
- **Basic OS detection**: Simple pattern matching
- **No stealth options**: Easily detectable
- **Limited protocol support**: TCP only
- **Basic timing controls**: Simple timeout management
- **No firewall evasion**: Direct connections only

## Common Use Cases

### Network Administration
- Inventory network services
- Verify firewall rules
- Audit open ports

### Security Testing
- Baseline security assessment
- Service enumeration
- Attack surface mapping

### Education
- Understanding network protocols
- Learning reconnaissance techniques
- Practicing ethical hacking concepts

## Troubleshooting

### Common Issues

**Permission Errors**
```bash
# Linux/macOS
sudo python network_scanner.py -t 127.0.0.1 -p common

# Windows (Run as Administrator)
python network_scanner.py -t 127.0.0.1 -p common
```

**Firewall Blocking**
- Ensure target firewall allows connections
- Check local firewall rules
- Use verbose mode to see errors

**Slow Performance**
- Reduce thread count: `--threads 25`
- Increase timeout: `--timeout 5`
- Scan fewer ports

### Performance Tuning

| Scenario | Threads | Timeout | Notes |
|----------|---------|---------|-------|
| Local network | 100 | 1-2s | Fast, reliable network |
| Internet hosts | 25-50 | 3-5s | Account for latency |
| Slow targets | 10-25 | 5-10s | Legacy or slow systems |

## Security Considerations

### Ethical Usage
- Only scan networks you own
- Obtain written permission before testing
- Respect rate limits and timeouts
- Document all scanning activities

### Legal Compliance
- Understand local cybersecurity laws
- Follow responsible disclosure practices
- Respect terms of service
- Consider business impact

### Detection Avoidance
This tool does **not** implement stealth techniques:
- All scans are easily detectable
- Logs will show connection attempts
- IDS/IPS systems will trigger alerts
- Firewall logs will record activity

## Advanced Usage

### Scripting and Automation

```python
#!/usr/bin/env python3
from network_scanner import NetworkScanner

# Create scanner instance
scanner = NetworkScanner()
scanner.timeout = 2
scanner.threads = 75

# Perform automated scan
results = scanner.scan(
    targets=['192.168.1.1-10'],
    port_range='common',
    output_format='json'
)

# Process results
for host in results:
    if host['open_ports']:
        print(f"Host {host['ip']} has {len(host['open_ports'])} open ports")
```

### Custom Port Lists

```python
# Define custom port sets
web_ports = "80,443,8080,8443,8000-8010"
database_ports = "3306,5432,1433,27017,6379"
admin_ports = "22,23,3389,5900,5985,5986"

# Scan specific service types
scanner.scan(['10.0.0.1'], web_ports)
```

## Contributing

This is an educational project. Contributions that enhance learning value are welcome:

- Improved documentation
- Additional service signatures
- Better error handling
- Performance optimizations
- Educational examples

## References

### Learning Resources
- [Nmap Network Discovery](https://nmap.org/book/man-host-discovery.html)
- [TCP/IP Illustrated](https://www.amazon.com/TCP-Illustrated-Protocols-Addison-Wesley-Professional/dp/0321336313)
- [Python Socket Programming](https://docs.python.org/3/library/socket.html)

### Professional Tools
- [Nmap](https://nmap.org/) - Industry standard network scanner
- [Masscan](https://github.com/robertdavidgraham/masscan) - High-speed port scanner
- [Zmap](https://zmap.io/) - Internet-wide network scanner

## License

This educational tool is provided as-is for learning purposes. Use responsibly and ethically.

---

**Remember**: With great power comes great responsibility. Use this knowledge to defend and improve security, not to cause harm.