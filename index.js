/**
 * SMCRM SDK - Main Entry Point
 * @version 1.1.0
 */

const axios = require('axios');

class SMCRMSDK {
    constructor(config = {}) {
        this.apiKey = config.apiKey || null;
        this.baseURL = config.baseURL || 'https://smcrm.in/api';
        this.timeout = config.timeout || 30000;
        this.retryCount = config.retryCount || 3;
        this.module = config.module || null;

        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            timeout: this.timeout,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // 🔑 API KEY attach
        this.axiosInstance.interceptors.request.use((config) => {
            if (this.apiKey) {
                config.headers['X-API-KEY'] = this.apiKey;
            }
            return config;
        });

        // ❌ Error handler
        this.axiosInstance.interceptors.response.use(
            (res) => res,
            (err) => Promise.reject(this.handleError(err))
        );
    }

    // 🔥 INIT
    async init(config = {}) {
        if (config.apiKey) this.apiKey = config.apiKey;
        if (config.baseURL) this.baseURL = config.baseURL;
        if (config.module) this.module = config.module;

        if (!this.module) {
            await this.detectModule();
        }

        return { status: true, module: this.module };
    }

    // 🔍 Detect Module
    async detectModule() {
        try {
            const res = await this.axiosInstance.get('/detect-module');
            this.module = res.data.module || 'repairservice';
        } catch {
            this.module = 'repairservice';
        }
        return this.module;
    }

    // 🔒 Ensure module loaded
    async ensureModule() {
        if (!this.module) {
            await this.detectModule();
        }
    }

    // ❌ Error format
    handleError(error) {
        if (error.response) {
            return {
                status: false,
                statusCode: error.response.status,
                message: error.response.data?.message || 'Server error',
                data: error.response.data
            };
        }

        return {
            status: false,
            message: error.message || 'Network error'
        };
    }

    // 🌐 Common Request
    async request(endpoint, method = 'GET', data = null) {
        try {
            const res = await this.axiosInstance({
                url: endpoint,
                method,
                data: method !== 'GET' ? data : undefined,
                params: method === 'GET' ? data : undefined
            });

            return res.data;

        } catch (err) {
            return this.handleError(err);
        }
    }

    // ============ SERVICES ============

    async getServices() {
        await this.ensureModule();

        if (this.module === 'repairservice') {
            return this.request('/repair/services');
        }
        return this.request('/services');
    }

    async getSubServices(id) {
        await this.ensureModule();

        if (this.module === 'repairservice') {
            return this.request(`/repair/sub-services/${id}`);
        }

        return { status: false, message: 'Not available' };
    }

    async getServiceSubServices() {
        await this.ensureModule();

        if (this.module === 'repairservice') {
            return this.request(`/repair/services/sub-services`);
        }

        return { status: false };
    }

    // ============ MODULE SPECIFIC ============

    async getPlans() {
        await this.ensureModule();

        if (this.module === 'gym') {
            return this.request(`/gym/plans`);
        }

        return { status: false };
    }

    async getDoctors() {
        await this.ensureModule();

        if (this.module === 'clinic') {
            return this.request(`/clinic/doctors`);
        }

        return { status: false };
    }

    // ============ BOOKING ============

    async createBooking(data) {
        await this.ensureModule();

        if (this.module === 'repairservice') {
            return this.request(`/repair/booking`, 'POST', data);
        }

        if (this.module === 'clinic') {
            return this.request(`/clinic/appointment-booking`, 'POST', data);
        }

        return { status: false, message: 'Booking not supported' };
    }

    // ============ BUSINESS ============

    async getBusiness() {
        await this.ensureModule();

        if (this.module === 'repairservice') {
           return this.request(`/repair/business-info`);
        }

        if (this.module === 'gym') {
           return this.request(`/gym/business-info`);
        }

        if (this.module === 'clinic') {
           return this.request(`/clinic/business-info`);
        }

        if (this.module === 'hostel') {
           return this.request(`/hostel/business-info`);
        }
    }
}

// 🚀 Instance
const SMCRM = new SMCRMSDK();

// 📦 Export
module.exports = SMCRM;
module.exports.default = SMCRM;
module.exports.SMCRMSDK = SMCRMSDK;

// 🌐 Browser global
if (typeof window !== 'undefined') {
    window.SMCRM = SMCRM;
}