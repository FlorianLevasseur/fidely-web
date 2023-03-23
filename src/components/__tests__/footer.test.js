import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from "../Footer";

describe('Testing Footer component', () => {
    beforeEach(async () => {
		render(<Footer />)
	})

    it('should render logo', () => {
        expect(screen.getAllByAltText('logo Fidely')).toBeTruthy()
    })

    it('should render text', () => {
        expect(screen.getByTestId("footer")).toHaveTextContent('Notre politique de confidentialité')
    })
})