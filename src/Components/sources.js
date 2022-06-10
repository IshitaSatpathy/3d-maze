const resources = '../Assets/resources'

export default [
    {
        name : 'envMap_texture',
        type : 'cubeTexture',
        path : [
            `${resources}/envMap/bluecloud_rt.jpg`,
            `${resources}/envMap/bluecloud_lf.jpg`,
            `${resources}/envMap/bluecloud_up.jpg`,
            `${resources}/envMap/bluecloud_dn.jpg`,
            `${resources}/envMap/bluecloud_bk.jpg`,
            `${resources}/envMap/bluecloud_ft.jpg`,
        ]
    },
    {
        name : 'Plane_albedo',
        type : 'texture',
        path : `${resources}/textures/concrete3-albedo.png`
    },
    {
        name : 'Plane_normal',
        type : 'texture',
        path : `${resources}/textures/concrete3-normal.png`
    },
    {
        name : 'Wall_metal',
        type : 'texture',
        path : `${resources}/textures/concrete3-metallic.png`
    },
    {
        name : 'Wall_normal',
        type : 'texture',
        path : `${resources}/textures/concrete3-normal.png`
    },
    {
        name : 'Wall_albedo',
        type : 'texture',
        path : `${resources}/textures/concrete3-albedo.png`
    },
    {
        name : 'Player_model',
        type : 'fbxModel',
        path : `${resources}/models/ybot.fbx`
    },
    {
        name : 'Player_Idle',
        type : 'fbxModel',
        path : `${resources}/animations/ybot/Idle.fbx`
    },
    {
        name : 'Player_Walk',
        type : 'fbxModel',
        path : `${resources}/animations/ybot/Walking.fbx`
    },
    {
        name : 'Player_Run',
        type : 'fbxModel',
        path : `${resources}/animations/ybot/Fast Run.fbx`
    },
    {
        name : 'Player_Jump',
        type : 'fbxModel',
        path : `${resources}/animations/ybot/Fast Jump.fbx`
    },
]