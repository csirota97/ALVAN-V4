import testRunner as testRunner
import os
import sys
sys.path.append('..{0}src{0}machine_learning'.format(os.sep))
import TTW

print(555, TTW.query('lights go off'))
tests = [
  (
    "Returns the correct response",
    lambda x, expected: TTW.query(x) == expected,
    'lights go off',
    3
  ),
]

testRunner.run(tests)