
interface Props {
    total: number;
}

function ChannelAbout({total}: Props) {

    return (
        <>
            <p className="channel__sub-title h6">Информация о канале</p>
            <span>Всего видео {total}</span>
        </>
    )
}

export default ChannelAbout;