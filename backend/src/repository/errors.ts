import postgres from "postgres";

export enum RepositoryError {
  None,
  UnknownError,
  Conflict,
}

export async function catchError<T>(
  func: () => Promise<T | null>
): Promise<[T | null, RepositoryError]> {
  try {
    return [await func(), RepositoryError.None];
  } catch (error: unknown) {
    return [null, processError(error)];
  }
}

export async function catchArrayError<T>(
  func: () => Promise<T[]>
): Promise<[T[], RepositoryError]> {
  try {
    return [await func(), RepositoryError.None];
  } catch (error: unknown) {
    return [[], processError(error)];
  }
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
