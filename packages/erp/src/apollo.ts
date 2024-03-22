import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: '/graphql',
    credentials: 'include',
    headers: {
        Authorization: 'Bearer 1|hEulYI7viHwcCh4fbja5Cs0sNbzVuwaYgTmoDZEj5a36cb41',
    }
})


// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

