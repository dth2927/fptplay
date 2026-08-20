/**
 * FPT Play VIP - Clean Custom Bypass
 * Author: Custom User
 */

"use strict";

let obj;
try {
  obj = JSON.parse($response.body);
} catch (error) {
  $done({});
}

if (obj) {
  let targetNode = obj.data || obj.result || obj;

  if (targetNode) {
    targetNode.is_vip = 1;
    targetNode.vip = true;
    targetNode.vip_status = 1;
    targetNode.is_subscriber = 1;
    targetNode.package_name = "VIP & MAX Ultimate";
    targetNode.package_code = "VIP_MAX_CUSTOM";
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

  obj.debug_sig = "FPT Play Custom Bypass Active";
}

$done({ body: JSON.stringify(obj) });
