import axios from 'axios'
import { useRuntimeConfig } from '#imports'
import type { IRecentActivity, IRecentActivityEvent } from '~/types/recent.activity'

// 获取 GitHub 用户最近活动
export const fetchGithubUserRecentActivity = async (username: string): Promise<IRecentActivity[]> => {
    const config = useRuntimeConfig()

    const data = await axios.get(`https://api.github.com/users/${username}/events/public`, {
        headers: {
            Authorization: `Bearer ${config.app.github.token}`,
            Accept: 'application/vnd.github+json',
        },
    })

    return data?.data?.map((item: IRecentActivityEvent) => {
        const { payload, created_at: timestamp, repo } = item

        switch (item.type) {
            case 'CreateEvent': {
                const { ref: name, ref_type: type } = payload
                return {
                    type: 'create',
                    ref: { name, type },
                    timestamp,
                    repo: repo,
                }
            }

            // case 'ForkEvent': {
            //     const {
            //         forkee: {full_name: forked},
            //     } = payload;
            //     return {
            //         type: 'fork',
            //         forked,
            //         timestamp,
            //         repo,
            //     };
            // }

            case 'IssuesEvent': {
                if (!['opened', 'closed', 'reopened'].includes(payload?.action ?? '')) return null

                const { action, issue } = payload
                return {
                    type: 'issue',
                    action,
                    issue,
                    timestamp,
                    repo,
                }
            }

            // Pull requests events
            case 'PullRequestEvent': {
                if (!['opened', 'closed', 'reopened'].includes(payload?.action ?? '')) return null

                const { action, pull_request } = payload
                return {
                    type: 'pull_request',
                    action,
                    pull_request: {
                        title: pull_request?.title,
                        number: pull_request?.number,
                        url: pull_request?.html_url,
                    },
                    timestamp,
                    repo,
                }
            }

            // Pushed commits to a repository
            case 'PushEvent': {
                const { size, commits, ref: branch } = payload
                return {
                    type: 'push',
                    size,
                    commits,
                    branch: branch?.split('/').pop(),
                    timestamp,
                    repo,
                }
            }

            // Starred a repository
            case 'WatchEvent': {
                const { action } = payload
                if (!['started'].includes(action ?? '')) return null

                return {
                    type: 'star',
                    timestamp,
                    repo,
                    action: 'starred',
                }
            }

            case 'PublicEvent': {
                return { type: 'public', timestamp, repo }
            }
        }
    }).filter(Boolean) as IRecentActivity[]
}
