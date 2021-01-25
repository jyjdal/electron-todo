<template>
  <div id="todo-list-component">
    <div style="font-size: 20px; color: #ffffff; height: 30px;">
      待办事项
    </div>
    <div class="todo-list">
      <div v-for="todo in unfinished" :key="todo.id" class="todo-item">
        <el-row type="flex" justify="start">
          <el-col :span="2" :offset="2">
            <el-icon
              class="el-icon-circle-check"
              title="点击完成"
              @click="changeFinishStatus(todo.id)"
            ></el-icon>
          </el-col>
          <el-col
            :span="20"
            @dblclick="openDialog(DialogType.EditItem, todo.id)"
          >
            {{ todo.content }}
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="font-size: 20px; color: #ffffff; height: 30px">
      已完成
    </div>
    <div class="todo-list">
      <div
        v-for="todo in finished"
        :key="todo.id"
        class="todo-item finished-item"
      >
        <el-row type="flex" justify="space-between">
          <el-col :span="2" :offset="2">
            <el-icon
              class="el-icon-circle-check"
              title="点击恢复"
              @click="changeFinishStatus(todo.id)"
            ></el-icon>
          </el-col>
          <el-col :span="16">
            {{ todo.content }}
          </el-col>
          <el-col :span="4">
            <el-icon
              class="el-icon-delete"
              title="点击删除"
              @click="deleteTodoItem(todo.id)"
            ></el-icon>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="new" @click="openDialog(DialogType.NewItem, '')">
      <i class="el-icon-circle-plus-outline"></i>
    </div>
    <div>
      <el-dialog
        :title="dialogTitle"
        width="98%"
        top="5vh"
        :model-value="dialogOpen"
      >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="content"
        >
        </el-input>
        <template v-slot:footer class="dialog-footer">
          <el-row type="flex" justify="end">
            <el-col>
              <el-button @click="dialogOpen = false">取 消</el-button>
              <el-button type="primary" @click="addOrEditItem">确 定</el-button>
            </el-col>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import TodoItem from "@/datastore/todoItem";
import dayjs from "dayjs";

enum DialogType {
  NewItem,
  EditItem
}

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();

    const todoList = ref([]);
    const db = store.state.db;

    // 这里使用计算属性进行遍历，如果是v-for和v-if的结合使用会造成性能浪费
    const unfinished = computed(() => {
      return todoList.value.filter((item: TodoItem) => {
        return !item.finished;
      });
    });

    const finished = computed(() => {
      return todoList.value.filter((item: TodoItem) => {
        return item.finished;
      });
    });

    return { todoList, db, unfinished, finished, DialogType };
  },
  data() {
    return {
      dialogTitle: "",
      dialogOpen: false,
      content: "",
      date: "",
      id: ""
    };
  },
  mounted() {
    this.updateList();
  },
  methods: {
    updateList() {
      this.todoList = this.db
        .read()
        .get("todo")
        .value();
    },
    changeFinishStatus(id: string) {
      const todo: TodoItem = this.db
        .read()
        .get("todo")
        .find({ id: id })
        .value();
      todo.finished = !todo.finished;

      this.db.update(todo).write();
      this.updateList();
    },
    deleteTodoItem(id: string) {
      this.db
        .get("todo")
        .remove({ id: id })
        .write();
      this.updateList();
    },
    openDialog(type: DialogType, id?: string) {
      if (type === DialogType.NewItem) {
        this.dialogTitle = "新建待办";
        this.content = "";
        this.date = "";
        this.dialogOpen = true;
      } else {
        const todo: TodoItem = this.db
          .read()
          .get("todo")
          .find({ id: id })
          .value();
        this.dialogTitle = "编辑待办";
        this.content = todo.content;
        this.date =
          todo.remindTime === undefined
            ? ""
            : todo.remindTime.format("YYYY-MM-DD HH:mm:ss");
        this.id = id === undefined ? "" : id;
        this.dialogOpen = true;
      }
    },
    addOrEditItem() {
      const repeat = this.db
        .read()
        .get("todo")
        .find((item: TodoItem) => {
          return item.content === this.content;
        });
      if (this.content !== "" && repeat != undefined) {
        if (this.dialogTitle === "新建待办") {
          const todo: TodoItem = {
            content: this.content,
            finished: false,
            remindTime: this.date === "" ? undefined : dayjs(this.date)
          };

          this.db
            .read()
            .get("todo")
            .insert(todo)
            .write();
        } else {
          const todo: TodoItem = this.db
            .read()
            .get("todo")
            .find({ id: this.id })
            .value();
          todo.content = this.content;
          todo.remindTime = this.date === "" ? undefined : dayjs(this.date);
          this.db.update(todo).write();
        }
        this.updateList();
        this.dialogOpen = false;
      } else {
        ElMessage({
          showClose: true,
          message: "未填写待办内容或待办内容已存在",
          center: true,
          type: "error"
        });
      }
    }
  }
});
</script>

<style>
.todo-list {
  color: #ffffff;
}

.todo-item {
  /*height: 30px;*/
  text-align: left;
  font-size: 18px;
}

.finished-item {
  text-decoration-line: line-through;
  color: darkgray;
}

.new {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  right: 10px;
  bottom: 20px;
}
</style>
