export function setIdentity(state, { token, role, expTime, uuid, userID }) {
  state.token = token;
  state.role = role;
  state.expTime = expTime;
  state.uuid = uuid;
  state.userID = userID;
}
