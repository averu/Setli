const handleError = (error: unknown, message: string): void => {
  if (error instanceof Error) {
    console.error(error.message)
  } else {
    console.error(message, error)
    alert(`${message}: ${error}`)
  }
}

const withOBSHandling = async <T>(operation: Promise<T>, errorMessage: string): Promise<T | null> => {
  try {
    return await operation
  } catch (error) {
    handleError(error, errorMessage)
    return null
  }
}

export { handleError, withOBSHandling }
