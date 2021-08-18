import axios, {AxiosResponse} from "axios";

import {UserService} from "./types";
import {User} from "./types";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const userService: UserService = {
  createUser: () =>
    axios.get(`${ENDPOINT}/create-user`).then((res: AxiosResponse<User>) => res.data),
};

export default userService;
