
function ListColumnSkeleton() {
    const skeletonItems = [...Array(6).keys()];

    return (
        <div className="skeleton is-column">
            {skeletonItems.map((item: number) => (
                <div key={item}
                     className="skeleton__item flex"
                >
                    <div className="skeleton__preview line"></div>

                    <div style={{width:'100%'}}>
                        <div className="skeleton__name line"></div>
                        <div className="skeleton__name line"></div>

                        <div className="skeleton__date line"></div>

                        <div className="flex flex-align-center">
                            <div className="skeleton__avatar line"></div>

                            <div className="skeleton__channel line"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListColumnSkeleton;