import postgres from "postgres";

export enum RepositoryError {
  None,
  UnknownError,
  Conflict,
}

export function processError(error: unknown): RepositoryError {
  if (error instanceof postgres.PostgresError) {
    if ((error.code = "23505")) {
      return RepositoryError.Conflict;
    }
  }

  console.log("Register unknown error:\n" + error);
  return RepositoryError.UnknownError;
}
