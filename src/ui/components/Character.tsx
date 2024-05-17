import { useContext } from 'react'
import { UserContext } from 'src/context'

const Character = ({ character, isFavorite }: any) => {
  const { handleFavoriteButton } = useContext(UserContext)
  return (
    <div className='flex flex-col items-center justify-between w-full gap-2 p-4 rounded-md shadow-lg min-w-64 max-w-56'>
      <figure className='overflow-hidden rounded-full w-28 h-28'>
        <img src={character?.image} alt={character?.name} />
      </figure>
      <div className='text-center'>
        <h1 className='font-semibold'>{character?.name}</h1>
        <h2>{character?.status}</h2>
        <h2>{character?.gender}</h2>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <button
          onClick={() =>
            handleFavoriteButton({
              name: character.name,
              data: {
                ...character,
                typeOfFav: 'character',
              },
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill={isFavorite(character?.name) ? '#3b82f6' : 'none'}
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#3b82f6'
            className='w-6 h-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Character
