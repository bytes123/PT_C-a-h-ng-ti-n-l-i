import React from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import vi from "date-fns/locale/vi";
export default function Time({ className, timestamp }) {
  return (
    <span className={className + " capitalize"}>
      {formatRelative(new Date(timestamp.replace(".000Z", "")), new Date(), {
        locale: vi,
      })}{" "}
      {/* Sử dụng locale tiếng Việt */}
    </span>
  );
}
