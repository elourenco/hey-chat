import { PresenceService } from "../presence.service";

describe("PresenceService", () => {
  afterEach(() => {
    PresenceService.listOnlineIds().forEach((id) => PresenceService.setOffline(id));
  });

  it("tracks users as online", () => {
    PresenceService.setOnline("user-1", "socket-1");

    expect(PresenceService.isOnline("user-1")).toBe(true);
    expect(PresenceService.listOnlineIds()).toEqual(["user-1"]);
  });

  it("removes users when set offline", () => {
    PresenceService.setOnline("user-1", "socket-1");
    PresenceService.setOffline("user-1");

    expect(PresenceService.isOnline("user-1")).toBe(false);
    expect(PresenceService.listOnlineIds()).toEqual([]);
  });

  it("removes users by socket id", () => {
    PresenceService.setOnline("user-1", "socket-1");

    const removedUser = PresenceService.setOfflineBySocket("socket-1");

    expect(removedUser).toBe("user-1");
    expect(PresenceService.isOnline("user-1")).toBe(false);
  });

  it("returns undefined when socket is unknown", () => {
    const removedUser = PresenceService.setOfflineBySocket("missing-socket");

    expect(removedUser).toBeUndefined();
  });
});
