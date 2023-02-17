import {
  GET_TASK_DETAIL,
  REMOVE_ASSIGNESS,
  UPDATE_ASSIGNESS,
  UPDATE_TASK,
} from "../constants/CyberBug/JiraBugTaskContants";

const initValue = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 3,
      priority: "Low",
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug",
    },
    assigness: [
      {
        id: 4259,
        avatar: "https://ui-avatars.com/api/?name=minhbao",
        name: "minhbao",
        alias: "minhbao",
      },
    ],
    lstComment: [
      {
        id: 7768,
        idUser: 4259,
        name: "minhbao",
        avatar: "https://ui-avatars.com/api/?name=minhbao",
        commentContent: "<p>comment 1222</p>",
      },
    ],
    taskId: 8625,
    taskName: "đây là new bug 1",
    alias: "day-la-new-bug-1",
    description: "<p>m&ocirc; tả</p>",
    statusId: "1",
    originalEstimate: 1,
    timeTrackingSpent: 5,
    timeTrackingRemaining: 10,
    typeId: 1,
    priorityId: 1,
    projectId: 11146,
  },
};

export const TaskReducer = (state = initValue, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      return { ...state, taskDetailModal: action.taskDetailModal };
    }
    case UPDATE_TASK: {
      console.log(action);
      const { name, value } = action;
      return {
        ...state,
        taskDetailModal: { ...state.taskDetailModal, [name]: value },
      };
    }
    case UPDATE_ASSIGNESS: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness,
        action.userSelect,
      ];
      return { ...state };
    }
    case REMOVE_ASSIGNESS: {
      console.log("!23", action);
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness.filter(
          (mem) => mem.id !== action.userId
        ),
      ];
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
