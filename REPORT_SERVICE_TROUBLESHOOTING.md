## REPORT SERVICE - TROUBLESHOOTING GUIDE

### Issue 1: "Failed to load dashboard data"
### Issue 2: "Failed to generate report"

These errors mean the frontend cannot connect to your backend Report Service.

---

## ✅ SOLUTIONS (Try in Order):

### **STEP 1: Verify Backend is Running**
- Make sure your Report Service backend is running on port **8081**
- Check in terminal: `http://localhost:8081`
- You should see something in the browser (or connection error, but port 8081 should respond)

### **STEP 2: Check Console Logs (F12)**
1. Press **F12** in your browser
2. Go to **Console** tab
3. Look for error messages - they show exact API path being called
4. You should see logs like:
   ```
   Fetching dashboard from: /report-analytics-service/report/operations
   ```

### **STEP 3: Update API Endpoints if Backend Path is Different**

Your backend paths are currently set to:
```
/report-analytics-service/report/operations
/report-analytics-service/report/custom/run
/report-analytics-service/report/custom/jobs/{jobId}
```

**If your backend uses different paths**, edit `src/axios/report_analytics_api.js`:

**Option A: If backend is at `/report` (without service prefix):**
```javascript
export const getOperationalDashboard = async () => {
  return await api.get('/report/operations');
};

export const runCustomReport = async (scope) => {
  return await api.post('/report/custom/run', { scope });
};

export const getJobStatus = async (jobId) => {
  return await api.get(`/report/custom/jobs/${jobId}`);
};
```

**Option B: If backend uses different port:**
Update `.env` file:
```
VITE_API_URL=http://localhost:9090  # Change 8081 to your port
```

### **STEP 4: Check CORS Issues**

If you see CORS errors in console, your backend needs to allow frontend requests.

Add to your Spring Boot application.properties:
```properties
# Allow CORS for localhost:5173 (your frontend dev server)
server.servlet.context-path=/
cors.allowed-origins=http://localhost:5173
```

Or in your Spring Boot Controller add:
```java
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/report")
public class ReportController {
  // ...
}
```

### **STEP 5: Network Tab Debugging**

1. Open **F12** → **Network** tab
2. Click "Dashboard" or "Generate Report" button
3. Look at the failed request
4. Check:
   - **URL**: Shows what endpoint it tried to call
   - **Status**: Should be 200 (success) or 404 (path wrong)
   - **Response**: Shows error message from backend

---

## 📝 Common Issues & Fixes:

| Issue | Cause | Fix |
|-------|-------|-----|
| 404 Error | Wrong API path | Update path in report_analytics_api.js |
| Connection refused | Backend not running | Start your backend service |
| CORS error | Backend blocks requests | Add @CrossOrigin to controller |
| timeout | Backend too slow | Check backend logs, increase timeout |

---

## 🔍 Debug Checklist:

- [ ] Backend running on port 8081? (test: http://localhost:8081)
- [ ] Check browser console (F12) for exact error
- [ ] Check Network tab to see what URL is being called
- [ ] Verify API path matches your backend @RequestMapping
- [ ] Backend returns JSON data (test with Postman)
- [ ] No CORS errors in console
- [ ] Frontend is on port 5173 or check .env file

---

## 📞 Backend Test with Postman:

Test these endpoints in Postman to verify backend works:

```
GET http://localhost:8081/report-analytics-service/report/operations
POST http://localhost:8081/report-analytics-service/report/custom/run
Body: { "scope": "ROUTE" }

GET http://localhost:8081/report-analytics-service/report/custom/jobs/1
```

If these work in Postman but not in browser → CORS issue
If these don't work → Backend path is wrong

---

## 💡 MOST COMMON FIX:

Your backend controller says `@RequestMapping("/report")` but you might need to:
1. Check if there's a gateway/proxy adding a prefix
2. Check actual running backend URL/port
3. Check if service is registered with different path name

**Ask your backend team:** "What is the exact URL and port for Report Service?"
