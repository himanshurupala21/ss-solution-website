import emailjs from "@emailjs/browser";

export interface ProjectRequestData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
}

export interface ConsultationBookingData {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  businessType?: string;
  industry: string;
  website?: string;
  mode: string;
  date: string;
  time: string;
  message?: string;
}

// Fetch IP Address dynamically
async function getIpAddress(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) throw new Error("IP fetch failed");
    const data = await res.json();
    return data.ip || "Not Available";
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return "Not Available";
  }
}

export const emailService = {
  async sendProjectRequest(data: ProjectRequestData): Promise<boolean> {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId || !autoReplyTemplateId) {
      console.warn("EmailJS environment variables are missing. Logging form data instead:", data);
      // Wait 1.5s to simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return true;
    }

    const ipAddress = await getIpAddress();
    const dateTime = new Date().toLocaleString();

    const templateParams = {
      subject: "New Project Inquiry",
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || "N/A",
      service: data.service,
      budget: data.budget,
      message: data.message,
      date_time: dateTime,
      ip_address: ipAddress,
    };

    try {
      // Send main notification email
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Send client confirmation auto-reply in a separate block to prevent blocking success
      try {
        await emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey);
      } catch (autoReplyErr) {
        console.warn("Auto-reply email failed to send, but primary notification was sent:", autoReplyErr);
      }
      
      return true;
    } catch (error) {
      console.error("EmailJS primary notification failed:", error);
      throw error;
    }
  },

  async sendConsultationBooking(data: ConsultationBookingData): Promise<boolean> {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId || !autoReplyTemplateId) {
      console.warn("EmailJS environment variables are missing. Logging booking data instead:", data);
      // Wait 1.5s to simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return true;
    }

    const ipAddress = await getIpAddress();
    const dateTime = new Date().toLocaleString();

    const templateParams = {
      subject: "New Free Consultation Booking",
      name: data.name,
      email: data.email,
      phone: data.phone,
      business_name: data.businessName || "N/A",
      business_type: data.businessType || "N/A",
      industry: data.industry,
      website: data.website || "N/A",
      mode: data.mode,
      date: data.date,
      time: data.time,
      message: data.message || "N/A",
      date_time: dateTime,
      ip_address: ipAddress,
    };

    try {
      // Send main booking details email
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Send booking confirmation auto-reply in a separate block
      try {
        await emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey);
      } catch (autoReplyErr) {
        console.warn("Auto-reply email failed to send, but primary notification was sent:", autoReplyErr);
      }
      
      return true;
    } catch (error) {
      console.error("EmailJS primary notification failed:", error);
      throw error;
    }
  },
};
