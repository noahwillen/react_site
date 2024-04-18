export default function Table({data}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    {Object.keys(data[0]).map(i => <th>{i}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map(item => 
                    <tr>
                        {Object.values(item).map(i => <td>{i}</td>)}
                    </tr>
                )}
            </tbody>
        </table>
    )
}