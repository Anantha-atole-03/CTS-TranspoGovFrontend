## BACKEND CORS FIX - Complete Solution

### Problem:
CORS (Cross-Origin Resource Sharing) is blocking requests from frontend (localhost:5173) to backend (localhost:8081)

### Error:
```
Access to XMLHttpRequest at 'http://localhost:8081/report/operations' has been blocked by CORS policy
```

---

## Solution 1: Add to ReportController (EASIEST - Try First)

Open your **ReportController.java** and add this import and annotation:

```java
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/report")
@Slf4j
@RequiredArgsConstructor
public class ReportController {
    // ... your existing code
}
```

**IMPORTANT:** Don't forget the import:
```java
import org.springframework.web.bind.annotation.RequestMethod;
```

**Then RESTART your backend service!**

---

## Solution 2: Create Global CORS Config (BETTER)

Create a new file: `src/main/java/com/cts/transport_gov/report_analytics_service/config/CorsConfig.java`

```java
package com.cts.transport_gov.report_analytics_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

**Then RESTART your backend service!**

---

## Solution 3: Add to application.properties

Add these lines to `application.properties` or `application.yml`:

**For application.properties:**
```properties
# CORS Configuration
cors.allowed-origins=http://localhost:5173
cors.allowed-methods=GET,POST,PUT,DELETE,PATCH,OPTIONS
cors.allowed-headers=*
cors.allow-credentials=true
cors.max-age=3600
```

**For application.yml:**
```yaml
cors:
  allowed-origins: http://localhost:5173
  allowed-methods: GET,POST,PUT,DELETE,PATCH,OPTIONS
  allowed-headers: "*"
  allow-credentials: true
  max-age: 3600
```

Then add a configuration class:

```java
package com.cts.transport_gov.report_analytics_service.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

**Then RESTART your backend service!**

---

## Checklist:

- [ ] Added CORS configuration to backend (choose one solution above)
- [ ] Restarted backend service completely
- [ ] Frontend is running on localhost:5173
- [ ] Backend is running on localhost:8081
- [ ] Cleared browser cache (Ctrl+Shift+Delete) and refreshed (F5)
- [ ] Checked browser console for errors

---

## How to Verify CORS is Working:

Test with curl or Postman:

```bash
# Add Origin header
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:8081/report/operations -v
```

You should see in response headers:
```
Access-Control-Allow-Origin: http://localhost:5173
```

---

## If Still Not Working:

1. Check your backend console for errors
2. Verify backend actually restarted (look for "started on port" message)
3. Make sure you're not running backend in a Docker container with different networking
4. Try adding CORS to other microservices too (Route, Ticket, Program, Compliance services)

---

## For Production:

Change:
```
http://localhost:5173
```

To:
```
https://yourdomain.com
```

And keep credentials and methods restricted as needed.
