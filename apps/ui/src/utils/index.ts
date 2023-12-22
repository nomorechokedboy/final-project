import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function FromNow(date: string) {
  return dayjs(date).fromNow();
}
