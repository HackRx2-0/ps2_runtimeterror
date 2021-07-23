import * as api from "../api/index.js";

export const createChannel = (request) => async (dispatch) => {
  const { data } = await api.createChannel(request);
  console.log(data);
};

export const getChannel = () => async (dispatch) => {
  const { data } = await api.getChannel();
  console.log(data);
};


export co