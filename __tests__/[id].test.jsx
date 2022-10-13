
//jest Imports
import { render, screen } from '@testing-library/react'
import Entry from '../pages/[id]'
import '@testing-library/jest-dom'


//Jest Tests 
describe('Entry', () => {
  it('renders a heading', () => {
    render(<Entry />)

    //since the heading will be different on every page, just check to make sure
    //that there is a heading there. 
    const heading = screen.getByRole('heading')

    expect(heading).toBeInTheDocument()
  })
})

//use jest-dom to check by data attribute 
describe('Entry', () => {
    it('displays a card', () => {
        render(<Entry />)

        expect(screen.getByTestId('not-empty')).not.toBeEmptyDOMElement()
    })
})



//check to make sure that the friends list are populating with hyperlinks to other pages

//React Test, good for when components re-render, 
//but not really needed in static rendering
// test('loads and displays greeting', async () => {
//     // Render a React element into the DOM
//     render(<Entry/>)
  
//     await userEvent.click(screen.getByText('Load Greeting'))
//     // wait before throwing an error if it cannot find an element
//     await screen.findByRole('heading')
  
//     // assert that the alert message is correct using
//     // toHaveTextContent, a custom matcher from jest-dom.
//     expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//     expect(screen.getByRole('button')).toBeDisabled()
//   })
  
