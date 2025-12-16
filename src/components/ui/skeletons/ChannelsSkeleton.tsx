
function ChannelsSkeleton() {
    const skeletonItems = [...Array(7).keys()];

    return (
        <div className="skeleton channels">
            {skeletonItems.map((item: number) => (
                <div key={item} className="skeleton__item line"></div>
            ))}
        </div>
    )
}

export default ChannelsSkeleton;