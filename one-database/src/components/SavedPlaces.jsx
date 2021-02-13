import React from 'react'

const SavedPlaces = () => {
    const savedShopList = [
        {
            name: "shop1",
            description: "coffee shop 1 here",
            isChosen: false,
            distance: 32,
            id: 1,
        },
        {
            name: "shop2",
            description: "coffee shop 2 here",
            isChosen: false,
            distance: 22,
            id: 2,
        },
        {
            name: "shop2",
            description: "coffee shop 3 here",
            isChosen: true,
            distance: 12,
            id: 3,
        },
        {
            name: "shop2",
            description: "coffee shop 4 here",
            isChosen: true,
            distance: 52,
            id: 4,
        },
    ];
    return (
        <div className="main">
            <div className="marginControl">
                <div className="ourServicesCardRow">
                    <div>
                        {savedShopList.map((shop) => (
                            <div key={shop.id} className="shopCard">
                                <div className="shopDetails">{shop.name}</div>
                                <div className="shopDetails twoRows">
                                    <div>{shop.description}</div>
                                    <div>{shop.distance}</div>
                                </div>
                                <div className="shopDetails">{shop.isChosen ? "yes" : "no"}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedPlaces
