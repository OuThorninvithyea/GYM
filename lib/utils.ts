import { type ClassValue, clsx } from "clsx";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date): string {
  return format(date, "MMM dd, yyyy");
}

export function formatDateTime(date: Date): string {
  return format(date, "MMM dd, yyyy h:mm a");
}

export function formatTimeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatCurrency(
  amount: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function generateQRId(): string {
  return `ELIT-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
}

export function validatePhone(phone: string): boolean {
  // Cambodia phone format: +855 or 0 followed by 8-9 digits
  const phoneRegex = /^(\+855|0)[1-9]\d{7,8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

export function formatPhoneNumber(phone: string): string {
  // Format to +855 format
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("0")) {
    return `+855${cleaned.substring(1)}`;
  }
  if (!cleaned.startsWith("+")) {
    return `+855${cleaned}`;
  }
  return cleaned;
}

export function getProgressColor(daysLeft: number): string {
  if (daysLeft > 30) return "bg-green-500";
  if (daysLeft > 7) return "bg-yellow-500";
  return "bg-red-500";
}

export function getProgressPercentage(
  joinDate: Date,
  expiryDate: Date
): number {
  const now = new Date();
  const total = expiryDate.getTime() - joinDate.getTime();
  const elapsed = now.getTime() - joinDate.getTime();
  const percentage = (elapsed / total) * 100;
  return Math.min(Math.max(percentage, 0), 100);
}

export async function downloadQRCode(
  elementId: string,
  filename: string = "qr-code.png"
) {
  const canvas = document.getElementById(elementId) as HTMLCanvasElement;
  if (canvas) {
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
  }
}

export function exportToCSV(data: any[], filename: string = "export.csv") {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          if (value instanceof Date) {
            return format(value, "yyyy-MM-dd HH:mm:ss");
          }
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}
