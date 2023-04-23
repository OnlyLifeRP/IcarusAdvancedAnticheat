const tazerHash = 911657153;

module.exports = (sender, data) => {
    const weaponHash = data.weaponType;
    const netId = data.hitGlobalId || data.hitGlobalIds[0];
    const target = NetworkGetEntityFromNetworkId(netId);
    const ped = GetPlayerPed(sender);

    if (!DoesEntityExist(target) || !IsPedAPlayer(target)) { return; }

    const pCoords = GetEntityCoords(ped);
    const tCoords = GetEntityCoords(target);
    const distance = Math.sqrt((pCoords[0] - tCoords[0]) ** 2 + (pCoords[1] - tCoords[1]) ** 2);

    if (distance > 400) {
        emitNet("icarus:my602oxd71pv", sender, "Weapon Range [C1]", false, {
            distance: distance
        });
        CancelEvent();
    } else if (weaponHash == tazerHash && distance > serverConfig.Modules.WeaponRange.maxTazerRange) {
        emitNet("icarus:my602oxd71pv", sender, "Weapon Range [C2]", false, {
            distance: distance,
            tazer: serverConfig.Modules.WeaponRange.maxTazerRange
        });
        CancelEvent();
    }
};