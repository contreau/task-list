import { writable } from "svelte/store";

export const taskList = writable([]);
export const completedTasks = writable([]);
export const completedTaskView = writable(false);
export const getDateTime = function () {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  let minutes;

  if (date.getMinutes() < 10) {
    minutes = `0${date.getMinutes()}`;
  } else {
    minutes = date.getMinutes();
  }

  this.dateString = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getUTCFullYear()} at ${date.getHours()}:${minutes}`;
};
