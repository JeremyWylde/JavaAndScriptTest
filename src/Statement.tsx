import React from 'react';

type performance = {
    playId: string,
    type: string,
    audience: number
}

type invoicesType = {
    customer: string,
    performance:Array<performance>
};

const Statement: React.FC<invoicesType> = ({customer, performance}) => {

    const volumeAmount = ():number => {
        let res = 0;

        for(let perf of performance){
            res += priceFor(perf);
        }

        return res;
    };

    const priceFormat = (num: number) => {
        return new Intl.NumberFormat("ru-RU",
            {
                style: "currency", currency: "RUB",
                minimumFractionDigits: 2
            }).format(num/100);
    };

    const priceFor = (play:performance):number =>{
        let res = 0;

        switch (play.type) {
            case "tragedy":
                res = 40000;
                if (play.audience > 30) {
                    res += 1000 * (play.audience - 30);
                }
                break;

            case "comedy":
                res = 30000;
                if (play.audience > 20) {
                    res += 10000 + 500 * (play.audience - 20);
                }
                res += 300 * play.audience;
                break;

            default:
                throw new Error(`неизвестный тип: ${play.type}`);
        }

        return res
    };

    const CreditsFor = (play:performance):number => {
        let res = 0;

        res += Math.max(play.audience - 30, 0);
        if ("comedy" === play.type)
            res += Math.floor(play.audience / 5);

        return res;
    };

    const totalCredits = ():number => {
        let res = 0;

        for(let perf of performance){
            res += CreditsFor(perf);
        }

        return res;
    };

    //вариант рефакторинга функции из задания.
    let statement = (invoices: invoicesType):string => {
        let result = `Счет для ${invoices.customer}\n`;

        for (let perf of invoices.performance) {
            result += `   ${perf.playId}: ${priceFormat(priceFor(perf))}`;
            result += ` (${perf.audience} мест)\n`;
        }
        result += `Итого с вас ${priceFormat(volumeAmount())}\n`;
        result += `Вы заработали ${totalCredits()} бонусов`;

        return result;
    };

    return (
        <div className="container">
            <h1>{`Счет для ${customer}`}</h1>
            {performance.map((perf)=>{
                return <p key={perf.playId}>{perf.playId}: {priceFormat(priceFor(perf))} ({perf.audience} мест)</p>;
            })}
            <p>Итого с вас: {priceFormat(volumeAmount())}</p>
            <p>Вы заработали: {totalCredits()} бонусов</p>
        </div>
    );
};

export default Statement;
