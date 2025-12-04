import {useFormatDate} from "../../../composables/useFormatDate.ts";

interface Props {
    total: number;
    date: string;
}

function ChannelAbout({total, date}: Props) {

    return (
        <div className="channel__about">
            <p className="channel__sub-title h6">Информация о канале</p>

            <ul className="channel__statistic">
                <li className="channel__statistic-item">Всего видео: {total}</li>
                <li className="channel__statistic-item">Дата создания: {useFormatDate(date)}</li>
            </ul>
        </div>
    )
}

export default ChannelAbout;