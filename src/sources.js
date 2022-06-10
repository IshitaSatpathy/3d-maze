export default [
    {
        name : 'envMap_texture',
        type : 'cubeTexture',
        path : [
            "/envMap/bluecloud_rt.jpg",
            "/envMap/bluecloud_lf.jpg",
            "/envMap/bluecloud_up.jpg",
            "/envMap/bluecloud_dn.jpg", 
            "/envMap/bluecloud_bk.jpg",
            "/envMap/bluecloud_ft.jpg",
        ]
    },
    {
        name : 'Plane_albedo',
        type : 'texture',
        path : "/textures/concrete3-albedo.png"
    },
    {
        name : 'Plane_normal',
        type : 'texture',
        path : "/textures/concrete3-normal.png"
    },
    {
        name : 'Wall_metal',
        type : 'texture',
        path : "/textures/concrete3-metallic.png"
    },
    {
        name : 'Wall_normal',
        type : 'texture',
        path : "/textures/concrete3-normal.png"
    },
    {
        name : 'Wall_albedo',
        type : 'texture',
        path : "/textures/concrete3-albedo.png"
    },
    {
        name : 'Player_model',
        type : 'fbxModel',
        path : "/models/ybot.fbx"
    },
    {
        name : 'Player_Idle',
        type : 'fbxModel',
        path : "/animations/ybot/Idle.fbx"
    },
    {
        name : 'Player_Walk',
        type : 'fbxModel',
        path : "/animations/ybot/Walking.fbx"
    },
    {
        name : 'Player_Run',
        type : 'fbxModel',
        path : "/animations/ybot/Fast Run.fbx"
    },
    {
        name : 'Player_Jump',
        type : 'fbxModel',
        path : "/animations/ybot/Fast Jump.fbx"
    },
]