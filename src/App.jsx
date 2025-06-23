import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './server'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  console.log(JSON.parse(JSON.stringify(result)))

  // const handleVote = (anecdote) => {
  //   console.vote
  // }

  if (result.isLoading) {
    return <div>Loading anecdotes.......</div>
  }

  if (result.isError) {
    return <span>Anecdote service is not available due to problems occuring in the server. Error cause: {result.error.message}</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
