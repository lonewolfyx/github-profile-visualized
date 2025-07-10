import axios from 'axios'

export const githubGraphql = (query: string, variables: object) => {
    const config = useRuntimeConfig()
    return new Promise((resolve, reject) => {
        axios.post(
            'https://api.github.com/graphql',
            { query, variables },
            {
                headers: {
                    Authorization: `Bearer ${config.app.github.token}`,
                    Accept: 'application/vnd.github+json',
                },
            })
            .then((response) => {
                if (!response.data.data) {
                    reject(false)
                }

                resolve(response.data.data)
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}
