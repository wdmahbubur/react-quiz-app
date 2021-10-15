import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import useVideoList from '../../hooks/useVideoList';
import Video from '../Video/Video';
import './Videos.css';

const Videos = () => {
    const [page, setPage] = useState(1);
    const { loading, error, videos, hasMore } = useVideoList(page);

    return (
        <div>
            {
                videos.length > 0 && <InfiniteScroll
                    dataLength={videos.length}
                    hasMore={hasMore}
                    next={() => setPage(page + 8)}
                    className="videos"
                >
                    {
                        videos.map((video) => <Link to={
                            video.noq > 0 ? {
                                pathname: `/quiz/${video.youtubeID}`,
                                state: {
                                    videoTitle: `${video.title}`
                                }
                            }

                                :
                                "#"
                        }
                            key={video.youtubeID}
                        >
                            <Video title={video.title} youtubeId={video.youtubeID} noq={video.noq}></Video>
                        </Link>

                        )
                    }
                </InfiniteScroll>
            }
            {!loading && videos.length === 0 && <div>No Data Found</div>}
            {error && <div>Data Loading Failed</div>}
            {loading && <div>Loading...</div>}
        </div>

    );
};

export default Videos;