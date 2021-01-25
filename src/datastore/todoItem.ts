import dayjs from "dayjs";

interface TodoItem {
  id?: string;
  content: string;
  finished: boolean;
  remindTime?: dayjs.Dayjs;
}

export default TodoItem;
