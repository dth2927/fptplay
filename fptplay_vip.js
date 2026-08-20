/**
 * FPT Play Universal Debug & VIP Engine
 * Author: DangTrungHieu
 */

"use strict";

let url = $request.url;
let body = $response.body;

// In ra Console của Shadowrocket để kiểm tra URL nào đang chạy
console.log("[FPT Play Debug] URL: " + url);

if (body) {
  try {
    let obj = JSON.parse(body);

    // In ra một phần dữ liệu gốc để phân tích cấu trúc
    console.log("[FPT Play Debug] Original Body: " + body.substring(0, 200));

    // Chiến thuật tổng lực: Tìm mọi ngóc ngách có thể chứa thông tin user/gói cước để ép đổi
    let targets = [obj, obj.data, obj.result, obj.user, obj.account, obj.profile];

    targets.forEach(node => {
      if (node && typeof node === "object") {
        node.is_vip = 1;
        node.vip = true;
        node.vip_status = 1;
        node.is_subscriber = 1;
        node.package_name = "VIP & MAX Ultimate";
        node.package_code = "VIP_MAX_ALL";
        node.expired_date = 4102444800; // Năm 2099
        node.package_expired_date = "2099-12-31 23:59:59";
        node.end_time = 4102444800;
        node.require_vip = 0;
        node.is_locked = false;
        node.allow_play = true;
      }
    });

    // Nếu có danh sách gói cước, kích hoạt toàn bộ
    if (Array.isArray(obj.packages)) {
      obj.packages.forEach(pkg => {
        pkg.status = 1;
        pkg.is_active = true;
        pkg.expired_date = "2099-12-31T23:59:59Z";
      });
    }

    body = JSON.stringify(obj);
    console.log("[FPT Play Debug] Modified successfully!");
  } catch (e) {
    console.log("[FPT Play Debug Error]: " + e.message);
  }
}

$done({ body: body });
