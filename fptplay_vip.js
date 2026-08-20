/**
 * FPT Play Pro - Deep VIP & Ad-Block Engine
 * Author: Custom User
 */

"use strict";

let url = $request.url;
let body = $response.body;

try {
  let obj = JSON.parse(body);

  // 1. LUỒNG 1: Xử lý thông tin Profile / Tài khoản / Gói cước
  if (url.includes("user") || url.includes("profile") || url.includes("account") || url.includes("me") || url.includes("get_package")) {
    let targetNode = obj.data || obj.result || obj;
    if (targetNode) {
      targetNode.is_vip = 1;
      targetNode.vip = true;
      targetNode.vip_status = 1;
      targetNode.is_subscriber = 1;
      targetNode.package_name = "VIP & MAX Ultimate";
      targetNode.package_code = "VIP_MAX_ALL";
      targetNode.expired_date = 4102444800; // Năm 2099
      targetNode.package_expired_date = "2099-12-31 23:59:59";
      targetNode.end_time = 4102444800;

      if (targetNode.devices && typeof targetNode.devices === "object") {
        targetNode.devices.max_allowed = 5;
        targetNode.devices.current_devices = 1;
      }
    }
    if (Array.isArray(obj.packages)) {
      obj.packages.forEach(pkg => {
        pkg.status = 1;
        pkg.is_active = true;
        pkg.expired_date = "2099-12-31T23:59:59Z";
      });
    }
  }

  // 2. LUỒNG 2: Xử lý phản hồi cấp phép xem video / lấy link stream
  if (url.includes("play") || url.includes("stream") || url.includes("get_link") || url.includes("authorize")) {
    let targetNode = obj.data || obj.result || obj;
    if (targetNode) {
      targetNode.require_vip = 0;
      targetNode.is_locked = false;
      targetNode.allow_play = true;
      targetNode.error_code = 0;
    }
  }

  // 3. LUỒNG 3: Xóa sạch dữ liệu quảng cáo trong cấu hình trả về
  if (url.includes("config") || url.includes("ads") || url.includes("setting")) {
    let targetNode = obj.data || obj.result || obj;
    if (targetNode) {
      if (Array.isArray(targetNode.ads)) targetNode.ads = [];
      if (Array.isArray(targetNode.advertisements)) targetNode.advertisements = [];
      targetNode.enable_ads = false;
      targetNode.show_ads = false;
    }
  }

  body = JSON.stringify(obj);
} catch (e) {
  // Bỏ qua lỗi nếu JSON không hợp lệ để tránh crash app
}

$done({ body: body });
