# 🚀 SMCRM SDK

Integrate SMCRM API in Minutes 🚀  
Simple, lightweight, and powerful JavaScript SDK for seamless integration with SMCRM services.

Supports modules like **Repair Service, Clinic, Gym, and Hostel**.

---

## 📦 Installation

```bash
npm install @smcrm-sdk2/smcrm-sdk
```

---

## ⚡ CDN Usage

```html
<script src="https://sdk.smcrm.in/smcrm-sdk.min.js" data-api-key="YOUR_API_KEY"></script>
```

---

## 🧠 Basic Usage

### 👉 Node.js / ES Module

```javascript
import SMCRM from "@smcrm-sdk2/smcrm-sdk";

await SMCRM.init({
  apiKey: "YOUR_API_KEY"
});

const services = await SMCRM.getServices();
console.log(services);
```

---

### 👉 Browser

```html
<script src="https://sdk.smcrm.in/smcrm-sdk.min.js" data-api-key="YOUR_API_KEY"></script>

<script>
(async () => {
    await SMCRM.init();

    const services = await SMCRM.getServices();
    console.log(services);
})();
</script>
```

---

## 🔍 Features

- ✅ Auto Module Detection (Repair, Gym, Clinic, Hostel)
- ✅ API Key Authentication
- ✅ Unified API Structure
- ✅ Works in Browser & Node.js
- ✅ Booking Management System
- ✅ Lightweight & Fast

---

## 📚 Available Methods

### 🔧 Services
```javascript
SMCRM.getServices()
SMCRM.getSubServices(serviceId)
SMCRM.getServiceSubServices()
```

---

### 🏥 Module Specific
```javascript
SMCRM.getPlans()     // Gym
SMCRM.getDoctors()   // Clinic
```

---

### 📦 Booking
```javascript
SMCRM.createBooking(data)
SMCRM.getBookings()
SMCRM.cancelBooking(id)
```

---

### 🏢 Business
```javascript
SMCRM.getBusiness()
```

---

## 🧪 Example Booking

```javascript
await SMCRM.createBooking({
  customer_name: "Rahul Sharma",
  mobile: "9876543210",
  service_name: "AC Repair",
  service_problem: "Cooling issue"
});
```

---

## 📡 API Documentation

👉 https://smcrm.in/documentation

---

## 📦 NPM Package

👉 https://www.npmjs.com/package/@smcrm-sdk2/smcrm-sdk

---

## 🛠 Configuration

```javascript
await SMCRM.init({
  apiKey: "YOUR_API_KEY",
  baseURL: "https://smcrm.in/api",
  module: "repairservice" // optional
});
```

---

## ⚠️ Error Handling

```json
{
  "status": false,
  "message": "Error message"
}
```

---

## 📄 License

MIT License © SMCRM