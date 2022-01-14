import { XCircleIcon } from "@heroicons/react/solid"

const Error = (error: Error) => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-md bg-red-50 p-4 w-96 my-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Oops...</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
