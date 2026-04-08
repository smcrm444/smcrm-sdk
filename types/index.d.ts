/**
 * SMCRM SDK TypeScript Definitions
 */

declare module 'smcrm-sdk' {
    export interface SMCRMConfig {
        apiKey?: string;
        baseURL?: string;
        timeout?: number;
        retryCount?: number;
        module?: 'repair' | 'clinic' | 'gym' | 'hostel';
    }

    export interface ApiResponse<T = any> {
        status: boolean;
        data?: T;
        message?: string;
        statusCode?: number;
        error?: any;
    }

    export interface Service {
        id: number;
        name: string;
        description: string;
        price: number;
        duration?: number;
    }

    export interface BookingData {
        customer_name: string;
        mobile: string;
        service_id: number;
        booking_date?: string;
        address?: string;
        comment?: string;
    }

    export interface Booking {
        id: number;
        booking_id: string;
        customer_name: string;
        mobile: string;
        service_id: number;
        service_name: string;
        booking_date: string;
        status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        amount: number;
        created_at: string;
    }

    export interface BusinessInfo {
        business_name: string;
        address: string;
        mobile: string;
        email: string;
        logo?: string;
        timings: string;
        social_links?: {
            facebook?: string;
            instagram?: string;
            twitter?: string;
        };
    }

    export interface Vendor {
        id: number;
        name: string;
        mobile: string;
        email: string;
        vendor_type: string;
        commission: number;
        is_blocked: boolean;
    }

    export interface Attendance {
        id: number;
        vendor_id: number;
        vendor_name: string;
        date: string;
        status: 'present' | 'absent' | 'halfday' | 'late';
        marked_at: string;
    }

    class SMCRMSDK {
        constructor(config?: SMCRMConfig);
        
        // Initialization
        init(config?: SMCRMConfig): Promise<ApiResponse<{ module: string }>>;
        detectModule(): Promise<ApiResponse<{ module: string }>>;
        
        // Configuration
        setApiKey(apiKey: string): ApiResponse;
        getApiKey(): string;
        setModule(module: 'repair' | 'clinic' | 'gym' | 'hostel'): ApiResponse;
        
        // Services
        getServices(): Promise<ApiResponse<Service[]>>;
        getSubServices(serviceId: number): Promise<ApiResponse<Service[]>>;
        
        // Booking
        createBooking(bookingData: BookingData): Promise<ApiResponse<Booking>>;
        getBookings(bookingId?: number): Promise<ApiResponse<Booking[] | Booking>>;
        cancelBooking(bookingId: number): Promise<ApiResponse>;
        
        // Business
        getBusiness(): Promise<ApiResponse<BusinessInfo>>;
        
        // Vendor
        getVendors(): Promise<ApiResponse<Vendor[]>>;
        getVendor(vendorId: number): Promise<ApiResponse<Vendor>>;
        
        // Attendance
        markAttendance(attendanceData: any): Promise<ApiResponse<Attendance>>;
        getRecentAttendance(): Promise<ApiResponse<Attendance[]>>;
        
        // Utility
        request(endpoint: string, method?: string, data?: any): Promise<ApiResponse>;
    }

    const SMCRM: SMCRMSDK;
    export default SMCRM;
}