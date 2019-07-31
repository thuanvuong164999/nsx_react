<ul className='style-list'>
    <li className='chanel-title'>Chanels</li>
    <li className='chanel-bg'>
        <ul className='chanel-list'>
            {
                this.state.rooms_chanels.map((value, index) => { //nhiều data (map) trong rooms được truyền vào value 
                    return (
                        <li key={index} onClick={(e) => this.onClick(e, value.id)}>{value.name}</li>
                        // e : event
                    )
                })
            }
        </ul>
    </li>
    <li className='messenger-title'>Direct Messengers</li>
    <li className='direct-bg'>
        <ul className='direct-list'>
            {
                this.state.rooms_messenger.map((value, index) => { //nhiều data (map) trong rooms được truyền vào value 
                    return (
                        <li key={index} onClick={(e) => this.onClick(e, value.id)}>{value.name}</li>
                        // e : event
                    )
                })
            }
        </ul>
    </li>
</ul>