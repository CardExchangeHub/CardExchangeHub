// import React from 'react';
// import { render } from '@testing-library/react';
// import { BrowserRouter, MemoryRouter } from 'react-router-dom';
// import App from './App';
// import { RenderResult } from '@testing-library/react';

// describe('App test', () => {
//   let app: RenderResult;
//   beforeEach(() => {
//     app = render(<App />, { wrapper: BrowserRouter });
//   });

//   it('should render App component', () => {
//     expect(app.getByText(/Hi! This is homepage/i)).toBeInTheDocument();
//   });
//   it('landing on a bad page', () => {
//     const badRoute = '/some/bad/route';
//     render(
//       <MemoryRouter initialEntries={[badRoute]}>
//         <App />
//       </MemoryRouter>
//     );
//     // verify navigation to "no match" route
//     expect(app.getByText(/Not Found/i)).toBeInTheDocument();
//   });
// });
