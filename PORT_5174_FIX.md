## IMMEDIATE FIX - Update CORS for Port 5174

Since your frontend is running on **localhost:5174** (not 5173), you need to update the CORS configuration.

### Update Your Backend CORS to Include Port 5174:

**Option 1: Update ReportController.java**

```java
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/report")
@Slf4j
@RequiredArgsConstructor
public class ReportController {
    // ... your code
}
```

**Option 2: Update CorsConfig.java**

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### After Update:
1. Save the Java file
2. Restart your backend service completely
3. Refresh your browser (F5)
4. Try accessing Reports again

---

## Alternative: Use Vite Proxy (Quick Fix Without Backend Changes)

Create/Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

Then update your `.env`:
```
VITE_API_URL=http://localhost:5174/api
```

Then update `axios.config.js`:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5174/api',
  withCredentials: true,
});
```

---

## Quick Checklist:

- [ ] Frontend is on: **http://localhost:5174** ✓
- [ ] Backend is on: **http://localhost:8081**
- [ ] Update CORS to include **5174** port
- [ ] Restart backend
- [ ] Refresh browser (Ctrl+Shift+R hard refresh)
- [ ] Check console for errors
