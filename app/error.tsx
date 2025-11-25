'use client';

export default function ErrorPage({error, reset}: {error: Error, reset: () => void}) {
    return (
        <div>
            <p>{error.message}</p>
            <button onClick={() => reset()}>
                Try again
            </button>
        </div>
    )
}