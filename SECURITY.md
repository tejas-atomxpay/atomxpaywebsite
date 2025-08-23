# Security Documentation

This document outlines the security measures implemented in the AtomX Pay website and provides guidelines for maintaining security.

## 🔒 Security Implementations

### 1. Content Security Policy (CSP)
**Location**: `index.html`
```
default-src 'self'; 
script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
font-src 'self' https://fonts.gstatic.com; 
connect-src 'self' https://open.er-api.com; 
img-src 'self' data: https:; 
frame-ancestors 'none';
```

**Purpose**: Prevents XSS attacks by controlling resource loading sources

### 2. Security Headers
**Location**: `index.html`
- **X-Frame-Options**: `DENY` - Prevents clickjacking attacks
- **X-Content-Type-Options**: `nosniff` - Prevents MIME type sniffing
- **X-XSS-Protection**: `1; mode=block` - Enables XSS filtering
- **Referrer-Policy**: `strict-origin-when-cross-origin` - Controls referrer information

### 3. CSS Injection Prevention
**Location**: `src/components/ui/chart.jsx`
- Replaced `dangerouslySetInnerHTML` with secure CSS custom properties
- Added CSS color validation using regex patterns
- Prevents malicious CSS injection through configuration

### 4. API Security & Resilience
**Location**: `src/hooks/useCurrencyAPI.ts`
- **Rate Limiting**: Max 10 requests per minute window
- **Request Timeout**: 10-second timeout for all requests
- **Retry Logic**: Exponential backoff with max 3 attempts
- **Abort Mechanism**: Proper cleanup of ongoing requests
- **Error Handling**: Graceful degradation with fallback values

### 5. Dependency Security
**Configurations**:
- `.nvmrc`: Pins Node.js version to 18.18.0
- `.npmrc`: Audit level set to moderate, exact version saving
- `package.json`: Security audit scripts integrated into build process

## 🛡️ Security Best Practices

### Input Validation
- All user inputs are validated using TypeScript interfaces
- Calculator input has range validation (0-50,000 USD)
- Color values in CSS are validated against secure regex patterns
- No `eval()` or string-based script execution

### XSS Prevention
- React's built-in JSX escaping used throughout
- No `dangerouslySetInnerHTML` except where safely replaced
- All dynamic content properly sanitized

### API Security
- HTTPS-only endpoints
- No API keys exposed in frontend code
- Proper error boundaries and fallback handling
- Rate limiting to prevent API abuse

## 🔧 Security Scripts

### Available Commands
```bash
# Run security audit
npm run security:audit

# Complete security check (audit + lint)
npm run security:check

# Automatically runs security check before build
npm run build
```

### Regular Security Tasks
1. **Weekly**: Run `npm audit` to check for vulnerabilities
2. **Monthly**: Update dependencies to latest secure versions
3. **Before deployment**: Run `npm run security:check`

## 🚨 Incident Response

### If Security Issue is Detected
1. **Immediate**: Stop deployment if in progress
2. **Assess**: Determine scope and impact
3. **Fix**: Apply security patch
4. **Test**: Verify fix doesn't break functionality
5. **Deploy**: Release security update
6. **Document**: Update this security documentation

### Reporting Security Issues
- Create private GitHub issue with "security" label
- Include detailed description and reproduction steps
- Tag relevant team members for immediate attention

## 📋 Security Checklist for Releases

### Pre-deployment Checklist
- [ ] Run `npm audit` - no high/critical vulnerabilities
- [ ] CSP headers properly configured
- [ ] All security headers present
- [ ] No sensitive data in source code
- [ ] API endpoints use HTTPS
- [ ] Input validation working correctly
- [ ] Error handling doesn't expose internal details

### Production Environment
- [ ] HTTPS enforced on all routes
- [ ] Security headers configured at server level
- [ ] Rate limiting enabled
- [ ] Regular backup procedures in place
- [ ] Monitoring and alerting configured

## 🔍 Security Monitoring

### Regular Audits
- **Automated**: GitHub Dependabot alerts
- **Manual**: Monthly security review
- **Tools**: npm audit, ESLint security rules

### Key Metrics to Monitor
- Failed API requests (potential attacks)
- Rate limiting triggers
- CSP violation reports
- Unusual traffic patterns

## 📚 Additional Resources

### Security Libraries Used
- **Zod**: Runtime type validation
- **React Hook Form**: Secure form handling
- **TypeScript**: Compile-time type safety

### External Security Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://reactjs.org/docs/security.html)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## 🔄 Security Updates

### Version History
- **v1.0**: Initial security implementation
  - CSP headers added
  - CSS injection vulnerability fixed
  - API rate limiting implemented
  - Dependency security measures

### Next Steps
- [ ] Implement automated security scanning in CI/CD
- [ ] Add security-focused ESLint rules
- [ ] Consider implementing CSRF protection for future forms
- [ ] Set up security monitoring dashboard

---

**Last Updated**: {Current Date}  
**Next Review**: {Current Date + 3 months}  
**Security Contact**: security@atomxpay.com