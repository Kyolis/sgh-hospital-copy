export class Release {
  timestamp: string;
  state: "TODO" | "IN_PROGRESS" | "DONE" | "FAILED" | "DELETE" | "DELETING" | "DELETE_FAILED";
  comments: string;
}

export class Hospital {
  id: string;
  name: string;
  staging_db: string = 'staging_db';
  live_db: string = 'staging_db';
  releases: Release[] = [];
  deleted: boolean = false;
}
