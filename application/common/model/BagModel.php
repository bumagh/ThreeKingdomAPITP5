<?php

namespace app\common\model;

use think\Model;

class BagModel extends BaseModel
{
    //
    protected $table = 'bag';
    // public function getListByAdminIdAndZoneId($id, $zoneId)
    // {
    //     return $this->where([
    //         ['admin_id', '=', $id],
    //         ['zone_id', '=', $zoneId]
    //     ])->field('admin_id,bag_id,zone_id', true)->select();
    // }
    public $id;
}
