const resources = '../Assets/resources'

export default [
    {
        name : 'environmentMapTexture',
        type : 'cubeTexture',
        path : [
            `${resources}/environmentMap/bluecloud_rt.jpg`,
            `${resources}/environmentMap/bluecloud_lf.jpg`,
            `${resources}/environmentMap/bluecloud_up.jpg`,
            `${resources}/environmentMap/bluecloud_dn.jpg`,
            `${resources}/environmentMap/bluecloud_bk.jpg`,
            `${resources}/environmentMap/bluecloud_ft.jpg`,
        ]
    },
    {
        name : 'floorColorTexture',
        type : 'texture',
        path : `${resources}/textures/Marble_Tile.jpg`
    },
    {
        name : 'floorNormalTexture',
        type : 'texture',
        path : `${resources}/textures/Marble_Tile_normal.png`
    },
    {
        name : 'PlayerModel',
        type : 'fbxModel',
        path : `${resources}/models/ninja.fbx`
    },
    {
        name : 'IdleAnimation',
        type : 'fbxModel',
        path : `${resources}/animations/ninja/Idle.fbx`
    },
    {
        name : 'WalkAnimation',
        type : 'fbxModel',
        path : `${resources}/animations/ninja/Sneak Walk.fbx`
    },
    {
        name : 'RunAnimation',
        type : 'fbxModel',
        path : `${resources}/animations/ninja/Run.fbx`
    },
]